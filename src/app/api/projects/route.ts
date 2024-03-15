import connectDb from "@/app/lib/mongodb";
import { Project } from "@/app/models/Project";
import project from "@/app/mongoModels/project";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

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
        const imagen: any = formData.get('imagen');

        console.log(formData);
        console.log(imagen.name);

        const filename = Date.now()+imagen.name;
        const directory = path.join(process.cwd(), "public/");
        const destinationPath = path.join(directory, filename);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        const buffer = Buffer.from(await imagen.arrayBuffer());
        await writeFile(destinationPath, buffer);

        await connectDb();
        const p:Project = {
            projectId: uuidv4(),
            nombre: nombre ? nombre.toString() : "",
            descripcion: descripcion ? descripcion.toString() : "",
            fecha: fecha ? fecha.toString() : "",
            stack: stack ? stack.toString() : "",
            imagen: imagen ? filename : ""
        }
        const resp = await project.create(p);

        return NextResponse.json({ msg: resp, status: 200 });

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
        console.log(projects);

        return NextResponse.json({ msg: projects });
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