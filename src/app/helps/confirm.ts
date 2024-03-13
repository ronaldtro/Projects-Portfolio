import Swal from 'sweetalert2';


function sweetAlert():any {
    return new Promise((resolve) => {
        Swal.fire({
            title: "Estas segur@ de realizar esta accion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22FF0C",
            cancelButtonColor: "#000000",
            cancelButtonText: "No",
            confirmButtonText: "Si"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Accion realizada exitosamente",
                    icon: "success",
                    confirmButtonColor: "#22FF0C"
                });

                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

export default async function confirm() {

    return new Promise((resolve) => {
        Swal.fire({
            title: "Estas segur@ de realizar esta accion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22FF0C",
            cancelButtonColor: "#000000",
            cancelButtonText: "No",
            confirmButtonText: "Si"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Accion realizada exitosamente",
                    icon: "success",
                    confirmButtonColor: "#22FF0C"
                });

                resolve(true);
            } else {
                resolve(false);
            }
        });
    });

}