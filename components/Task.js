import Link from 'next/link';
import Cookie from 'universal-cookie';
import { useContext } from 'react';
import { StateContext } from '../context/StateContext';

const cookie = new Cookie();

export default function Task({ task, taskDeleted }) {
  const { setSelectedTask } = useContext(StateContext);
  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    taskDeleted();
  };

  return (
    <div>
      <span>{task.id}</span>
      {' : '}
      <Link href={`/tasks/${task.id}`}>
        <span className="cursor-pointer text-white border-b  hover:bg-gray-600">
          {task.title}
        </span>
      </Link>
      <div className="float-right ml-20">
        <svg
          onClick={() => setSelectedTask(task)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 float-left cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <svg
          onClick={deleteTask}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
