import { GetServerSideProps } from 'next';

interface AppProps {
  app: string;
}

const AppPage = ({ app }: AppProps) => {
  return (
    <div>
      <h1>Welcome to {app}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { app } = context.params!;

  return {
    props: {
      app,
    },
  };
};

export default AppPage;