import { Project } from '../models/Project.js';
import { Task } from '../models/Task.js';

export const getProjects = async (req, res) => {
  try {
    const Projects = await Project.findAll();
    res.json(Projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { name, priority, description } = req.body;

  try {
    const newProject = await Project.create({
      name,
      description,
      priority,
    });

    res.json(newProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, priority, description } = req.body;

  try {
    const project = await Project.findByPk(id);
    project.name = name;
    project.priority = priority;
    project.description = description;
    // ojo siempre guardar en el update
    await project.save();
    // devuelvo el campo del proyecto que se actualizo
    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// buscando por id
export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({
      where: { id },
    });

    if (!project) return res.status(404).json({ message: 'Project does not exist' });

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// obteniendo las tareas de un solo project

export const getProjectTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.findAll({
      where: { projectId: id },
    });

    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// mostrando el padre project con sus hijos tasks

export const getProjectIncludeTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Task
        }
      ]
    });

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
