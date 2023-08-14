import connectDb from "@/app/lib/mongodb";
import { Project } from "@/app/models/Project";
import project from "@/app/mongoModels/project";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request:any){

    const req = await request.json();
    console.log(req);
    
    try{
        await connectDb();
        await project.create(req);

        return NextResponse.json({
            msg: "Proyecto agregado correctamente",
            success: true
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
    
    return NextResponse.json({msg: req});
}