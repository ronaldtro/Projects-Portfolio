import { CircularProgress, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Project from "./Project";
import { Project as ProjectModel } from "../models/Project";

export const Projects = () => {

  const projects = useSelector((store: any) => store.projects);

  return (
    <div>
      {projects.map((p: ProjectModel, index: number) => (
        <div key={p.projectId}>
          <Divider sx={{ bgcolor: "#1E1E1E" }} />
          <Project key={p.projectId} proyecto={p} indice={index} indiceMax={projects.length - 1} />
        </div>
      ))}
    </div>
  );
}