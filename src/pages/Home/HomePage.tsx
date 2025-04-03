import { Box, Button, CircularProgress, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateTaskModal from "./components/CreateTaskModal";
import TaskCard from "./components/TaskCard";
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useDroppable, useSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { createTaskAPI, deleteTaskAPI, getAllTasks, getUserInfoAPI, updateTaskAPI } from "../../api";
import { useNavigate } from "react-router-dom";

type TaskStatus = "Not started" | "In progress" | "Done"

export interface Task {
  _id: string,
  title: string,
  description?: string,
  status?: TaskStatus,
  dueDate?: Date,
  tags?: [string]
}

export default function HomePage() {
  const [selectedTaskData, setSelectedTaskData] = useState<Task>({ _id: "", title: "", status: "Not started" })
  const [userInfo, setUserInfo] = useState({ username: "", email: "" })
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false);
  const [tasksList, settasksList] = useState<Task[]>([])
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Task>();
  const navigate = useNavigate()

  const { setNodeRef } = useDroppable({
    id: 'home-page'
  })

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5
    }
  })

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveItem(tasksList.find((item) => item._id === active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return
    const activeItem = tasksList.find((item) => item._id === active.id);
    const overItem = tasksList.find((item) => item._id === over.id);

    if (!activeItem || !overItem) return

    const activeIndex = tasksList.findIndex((item) => item._id === active.id)
    const overIndex = tasksList.findIndex((item) => item._id === over.id)

    if (activeIndex !== overIndex) {
      settasksList((prev) => arrayMove<Task>(prev, activeIndex, overIndex))
    }
    setActiveItem(undefined)
  }
  const handleDragCancel = () => {
    setActiveItem(undefined)
  }
  const openModal = () => setCreateTaskModalOpen(true)
  const closeModal = () => {
    setCreateTaskModalOpen(false)
    setIsUpdating(false)
  }

  const openUpdateModal = (selectedTask: Task) => {
    setSelectedTaskData(selectedTask)
    setIsUpdating(true)
    openModal()
  }

  const saveTask = (newTask: Task) => {
    if (!isUpdating) {
      createTaskAPI(newTask).then(res => {
        settasksList([
          ...tasksList,
          res.createdTask
        ])
      })

    } else {
      updateTaskAPI(newTask)
      const selectedTaskIndex = tasksList.findIndex((task) => task._id === selectedTaskData._id)
      tasksList[selectedTaskIndex] = newTask
      settasksList(tasksList)
    }
    closeModal()
    setSelectedTaskData({ _id: "", title: "", status: "Not started" })
  }

  const handleDeleteTask = () => {
    deleteTaskAPI(selectedTaskData._id)
    const selectedTaskIndex = tasksList.findIndex((task) => task._id === selectedTaskData._id)
    tasksList.splice(selectedTaskIndex, 1)
    settasksList(tasksList)
    closeModal()
    setSelectedTaskData({ _id: "", title: "", status: "Not started" })
  }

  const handleChangeTaskData = (event: React.ChangeEvent<Element> | SelectChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement | { name?: string; value: unknown };
    setSelectedTaskData({
      ...selectedTaskData,
      [name as string]: value
    })
  }

  const handleLogOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getAllTasks()
      settasksList(data.tasks)
      const userInfoData = await getUserInfoAPI()
      setUserInfo(userInfoData.userInfo)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return isLoading
    ? <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
    : <DndContext
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      sensors={[sensor]}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ position: 'fixed', top: 15, right: 15, display: 'flex', justifyContent: 'right', gap: 2, alignItems: 'center' }}>
        <Typography>Logged in as <span style={{ fontWeight: 'bold' }}>{userInfo.username}</span></Typography>
        <Button onClick={handleLogOut} sx={{ textTransform: 'none' }} variant="outlined">Log out</Button>
      </Box>
      <Box
        ref={setNodeRef}
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: "30px", color: "#1c81e6" }} variant="h4">React Todo list</Typography>
        {tasksList.length > 0 ? <Box sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          width: '400px'
        }}>
          <SortableContext strategy={verticalListSortingStrategy} items={tasksList.map(t => t._id)}>
            <Box sx={{
              flex: 1
            }}>
              {tasksList.map((task) => <TaskCard key={task._id} task={task} onClick={() => openUpdateModal(task)} />)}
            </Box>
          </SortableContext>
          <DragOverlay>
            {activeItem ? <TaskCard key={activeItem._id} task={activeItem} onClick={() => openUpdateModal(activeItem)} /> : null}
          </DragOverlay>

        </Box> : <Typography>Your todo list is empty!</Typography>}
        <Box sx={{ height: 30 }}></Box>
        <Button sx={{ textTransform: 'none' }} onClick={openModal} variant="contained">New task</Button>
        <CreateTaskModal
          isUpdate={isUpdating}
          taskData={selectedTaskData}
          createTaskModalOpen={createTaskModalOpen}
          handleChangeTaskData={handleChangeTaskData}
          handleCloseCreateTaskModal={closeModal}
          saveTask={saveTask}
          closeModal={closeModal}
          handleDeleteTask={handleDeleteTask}
        />
      </Box>
    </DndContext>
}