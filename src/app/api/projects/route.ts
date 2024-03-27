import connectDb from "@/app/lib/mongodb";
import project from "@/app/mongoModels/project";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
//import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";
import { Project } from "@/app/models/Project";

function fileToBuffer(archivo: any) {
    return new Promise((resolve, reject) => {
        fs.readFile(archivo.path, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

//Guardar un proyecto
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const nombre = formData.get('nombre');
        const descripcion = formData.get('descripcion');
        const fecha = formData.get('fecha');
        const stack = formData.get('stack');
        const imagen: any = formData.get('imagen');//File

        //METODO LOCAL: GUARDAR IMAGEN EN EL SISTEMA DE ARCHIVOS DE LA APP

        // const filename = Date.now()+imagen.name;
        // const directory = path.join(process.cwd(), "public/");
        // const destinationPath = path.join(directory, filename);

        // if (!fs.existsSync(directory)) {
        //     fs.mkdirSync(directory);
        // }

        // const buffer = Buffer.from(await imagen.arrayBuffer());
        // await writeFile(destinationPath, buffer);

        // await connectDb();
        // const p:Project = {
        //     projectId: uuidv4(),
        //     nombre: nombre ? nombre.toString() : "",
        //     descripcion: descripcion ? descripcion.toString() : "",
        //     fecha: fecha ? fecha.toString() : "",
        //     stack: stack ? stack.toString() : "",
        //     imagen: imagen ? filename : ""
        // }
        // const resp = await project.create(p);

        // return NextResponse.json({ msg: resp, status: 200 });


        //NUEVO METODO: GUARDAR LA IMAGEN EN EL SERVIDOR CON FORMATO BUFFER
        await connectDb();
        const imagenBuffer = Buffer.from(await imagen.arrayBuffer());
        const base64Image = Buffer.from(imagenBuffer).toString('base64');
        const dataURL = `data:${imagen.type};base64,${base64Image}`;

        const p:Project = {
            projectId: uuidv4(),
            nombre: nombre ? nombre.toString() : "",
            descripcion: descripcion ? descripcion.toString() : "",
            fecha: fecha ? fecha.toString() : "",
            stack: stack ? stack.toString() : "",
            imagen: {
                data: dataURL,
                type: imagen.type
            }
        }

        const resp = await project.create(p);
        
        return NextResponse.json({
            msg: resp,
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: JSON.stringify({ error: 'Error interno del servidor' })
        });
    }
}

//Obtener lista de proyectos
export async function GET() {
    try {
        await connectDb();
        const projects = await project.find();

        // projects.map((p) => {
        //     const base64Image = Buffer.from(p.imagen.data).toString('base64');
        //     const dataURL = `data:${p.imagen.type};base64,${base64Image}`;
        //     p.imagen.type = dataURL;
        // });

        return NextResponse.json({ msg: projects });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(e);
            };
            return NextResponse.json({ msg: errorList });
        } else {
            return NextResponse.json({ msg: "Error no capturado" });
        }
    }
}

//Borrar un proyecto
export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("id");

    try {
        await connectDb();
        const deletedProject = await project.findByIdAndDelete(id);
        console.log("Proyecto " + deletedProject + " Eliminado de la Db");

        return NextResponse.json({
            msg: "Proyecto eliminado correctamente de la Db"
        });

    } catch (error: any) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(e);
            };
            NextResponse.json({ msg: errorList });
        } else {
            NextResponse.json({ msg: "Error no capturado" });
        }
    }
}