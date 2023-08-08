import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Project from "./Project";

export const Projects = () => {

    const projects = useSelector((store:any) => store.projects);
    
  
    return(
        <>
          {projects.length == 0 ? <Typography align="center" aria-label="NoProjects" variant="body1">
            *** No hay proyectos ***</Typography> : projects.map((p:any) => (
            <Project proyecto={p} />
          )) }
        </>
    );
}