
import { Task } from '../models/Task.js';


export const getTasks = async (req, res) => {
  try {
    const Tasks = await Task.findAll();
    console.log('testing')
    res.json(Tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const { name, done, projectId } = req.body;

  try {
    const newTask = await Task.create({
      name,
      done,
      projectId,
    });

    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, done, projectId } = req.body;

  try {
    const task = await Task.findByPk(id);
    // el metodo set permite que si no envio todos los params, solo actualiza los que envie 
    task.set(req.body)
    // ojo siempre guardar en el update
    await task.save();
    // devuelvo el campo del proyecto que se actualizo
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.destroy({
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
export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      where: { id },
    });

    if (!task) return res.status(404).json({ message: 'Project does not exist' });

    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
