export default function imagenUrl(dataBuffer: any, imageType: string){
    if((dataBuffer != undefined || dataBuffer != null) && (imageType != undefined || imageType != null)){
        const base64Image = Buffer.from(dataBuffer).toString('base64');
        const dataURL = `data:${imageType};base64,${base64Image}`;
        return dataURL;
    }else{
        return "";
    }

}