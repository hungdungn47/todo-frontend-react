import { Box, Typography } from "@mui/material";
import { Task } from "../HomePage";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface TaskCardProps {
  task: Task
  onClick: () => void
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
    data: task,
    transition: {
      duration: 150,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  const statusColor = task.status == 'Not started' ? '#e0bc09' : (task.status == 'In progress' ? '#1c81e6' : '#32a852')

  return <div
    style={style}
    ref={setNodeRef}

    {...attributes}
  >
    <Box
      onClick={onClick}
      {...listeners}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        border: '0.2px solid grey',
        boxShadow: 2,
        borderRadius: 1,
        paddingX: 1,
        paddingY: 2,
        marginBottom: 1
      }}
      key={task.title}
    >
      {task.title}
      {/* <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Edit onClick={onClick} sx={{ color: "#1c81e6" }} />
      </Box> */}
      <Typography sx={{
        color: statusColor,
        fontSize: 14
      }}>
        {task.status}
      </Typography>
    </Box>
  </div>;
}