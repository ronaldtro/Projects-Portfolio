import connectDb from "@/app/lib/mongodb";
import like from "@/app/mongoModels/like";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//Guardar un like
export async function POST(request: any) {

    const req = await request.json();

    try {
        await connectDb();
        const likeDb = await like.create(req);

        return NextResponse.json({
            msg: likeDb
        })
    } catch (error: any) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(e);
            }
            return NextResponse.json({
                msg: errorList
            });
        } else {
            return NextResponse.json({
                msg: "Error no capturado"
            });
        }
    }

}

//Obtener lista de likes
export async function GET() {
    try {
        await connectDb();
        const likes = await like.find();

        return NextResponse.json({ msg: likes });
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

//Borrar un like
export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("id");

    try {
        await connectDb();
        const deletedLike = await like.findByIdAndDelete(id);
        console.log("like " + deletedLike + " Eliminado de la Db");

        return NextResponse.json({
            msg: "Like eliminado correctamente de la Db"
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