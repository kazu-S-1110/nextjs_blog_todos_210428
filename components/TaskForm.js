import { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import Cookie from 'universal-cookie';

const cookie = new Cookie();

export default function TaskForm({ taskCreated }) {
  const { selectedTask, setSelectedTask } = useContext(StateContext);
}

const create = async (e) => {
  e.preventDefault();
  await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
    method: 'POST',
    body: JSON.stringify({ title: selectedTask.title }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${cookie.get('access_token')}`,
    },
  }).then((res) => {
    if (res.status === 401) {
      alert('JWT Token not valid');
    }
  });
  setSelectedTask({ id: 0, title: '' });
  taskCreated();
};
