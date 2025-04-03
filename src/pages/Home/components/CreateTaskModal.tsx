import { Box, Button, Divider, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Task } from "../HomePage";
import { Delete } from "@mui/icons-material";

interface CreateTaskModalProps {
  isUpdate?: boolean,
  taskData: Task
  createTaskModalOpen: boolean
  handleChangeTaskData: (event: React.ChangeEvent | SelectChangeEvent) => void
  handleCloseCreateTaskModal: () => void
  saveTask: (taskData: Task) => void
  closeModal: () => void
  handleDeleteTask: () => void
}

export default function CreateTaskModal({ isUpdate = false, taskData, createTaskModalOpen, handleChangeTaskData, handleDeleteTask, handleCloseCreateTaskModal, saveTask, closeModal }: CreateTaskModalProps) {
  return <Modal
    onClose={handleCloseCreateTaskModal}
    open={createTaskModalOpen}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 400,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 3,
        p: 4,
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        mb: 1
      }}>
        <Typography sx={{ fontWeight: 'bold', }}>{isUpdate ? 'Update task' : 'Create new task'}</Typography>
        {isUpdate && <Button onClick={handleDeleteTask} sx={{ textTransform: 'none' }} endIcon={<Delete />} variant="outlined" color="error">Delete task</Button>}
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'start', marginBottom: 3, justifyContent: 'space-between' }}>
        <Typography>Title<span style={{ color: "red", marginLeft: "4px" }}>*</span></Typography>
        <TextField name="title" value={taskData.title} onChange={handleChangeTaskData} sx={{ width: "70%", }} size='small'></TextField>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', marginBottom: 3, justifyContent: 'space-between' }}>
        <Typography>Description</Typography>
        <TextField name="description" value={taskData.description} onChange={handleChangeTaskData} sx={{ width: "70%", }} multiline rows={4} size='small'></TextField>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start', marginBottom: 3, justifyContent: 'space-between' }}>
        <Typography>Status</Typography>
        {/* <TextField name="status" value={taskData.status} onChange={handleChangeTaskData} sx={{ width: "70%", }} size='small'></TextField> */}
        <Select
          name="status"
          value={taskData.status}
          onChange={handleChangeTaskData}
        >
          <MenuItem value="Not started">Not started</MenuItem>
          <MenuItem value="In progress">In progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'end'
      }}>
        <Button onClick={closeModal} sx={{ textTransform: 'none', width: '70px', mr: '10px' }} variant="outlined">Cancel</Button>
        <Button onClick={() => {
          saveTask(taskData)
        }} sx={{ textTransform: 'none', width: '70px' }} variant="contained">Save</Button>
      </Box>
    </Box>
  </Modal>
}