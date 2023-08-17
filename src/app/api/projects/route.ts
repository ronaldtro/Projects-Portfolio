import connectDb from "@/app/lib/mongodb";
import { Project } from "@/app/models/Project";
import project from "@/app/mongoModels/project";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//Guardar un proyecto
export async function POST(request:any){

    const req = await request.json();
    console.log(req);
    
    try{
        await connectDb();
        const projectDb = await project.create(req);

        return NextResponse.json({
            msg: projectDb
        })
    }catch(error:any){
        if(error instanceof mongoose.Error.ValidationError){
            let errorList = [];
            for(let e in error.errors){
                errorList.push(e);
            }
            return NextResponse.json({
                msg: errorList
            });
        }else{
            return NextResponse.json({
                msg: "Error no capturado" 
            });
        }
    }
    
}

//Obtener lista de proyectos
export async function GET(){
    try{
        await connectDb();
        const projects = await project.find();
        console.log(projects);
        
        return NextResponse.json({msg: projects});
    }catch(error:any){
        if(error instanceof mongoose.Error.ValidationError){
            let errorList = [];
            for(let e in error.errors){
                errorList.push(e);
            };
            NextResponse.json({msg: errorList});
        }else{
            NextResponse.json({msg: "Error no capturado"});           
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