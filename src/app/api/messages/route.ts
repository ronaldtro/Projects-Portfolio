import connectDb from "@/app/lib/mongodb";
import message from "@/app/mongoModels/message";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//Guardar un mensaje
export async function POST(request:any){

    const req = await request.json();
    console.log(req);
    
    try{
        await connectDb();
        const messageDb = await message.create(req);

        return NextResponse.json({
            msg: messageDb
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

//Obtener lista de mensajes
export async function GET(){
    try{
        await connectDb();
        const mensajes = await message.find();
        console.log(mensajes);
        
        return NextResponse.json({msg: mensajes});
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

//Borrar un mensaje
export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("id");

    try {
        await connectDb();
        const deletedMessage = await message.findByIdAndDelete(id);
        console.log("Mensaje " + deletedMessage + " Eliminado de la Db");

        return NextResponse.json({
            msg: "Mensaje eliminado correctamente de la Db"
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