import { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getAllTaskIds, getTaskData } from '../../lib/tasks';
import { route } from 'next/dist/next-server/server/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Post({ staticTask, id }) {
  const router = useRouter();
  const { date: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      initialData: staticTask,
    }
  );

  useEffect(() => {
    mutate();
  }, []);
  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }

  return <Layout title={task.title}></Layout>;
}

export async function getStaticPaths() {
  const paths = await getAllTaskIds();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { task: staticTask } = await getTaskData(params.id);
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
}
