import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Col } from 'antd/es/grid';
import Button from 'antd/es/button';
import Collapse, { type CollapseProps } from 'antd/es/collapse/Collapse';
import UserProfile from '../users/UserProfile';
import type { User } from '../../models';
import Result from 'antd/es/result';
import { systemMessages } from '../../utils/utils';
import { useDelayedLoader } from '../../hooks/useDelayedLoader';
import ListLoader from '../loaders/ListLoader';
import { useGetUsersQuery } from '../../api/apiSlice';

function Home() {
  const [items, setItems] = useState<CollapseProps['items']>();
  const { data, isLoading, isError, refetch } = useGetUsersQuery(null);
  const showLoader = useDelayedLoader(isLoading);


  useEffect(() => {
    const mapped = data?.map((u: User) => ({
      key: u.id,
      label: u.name,
      children: <>
        <UserProfile user={u} >
          <Col span={5} >
            <Link to={`/posts/${u.id}`} >
              <Button type='primary' data-testid="posts-button">See posts</Button>
            </Link>
          </Col>
        </UserProfile>
      </>
    }))
    setItems(() => mapped);
  }, [setItems, data])

  if (showLoader) {
    return <ListLoader length={3} />
  }

  if (isError) {
    return <>
      <Result
        status="warning"
        title={systemMessages.GENERAL_ERROR}
        extra={
          <Button type="primary" key="console" onClick={refetch}>
            Retry
          </Button>
        }
      />
    </>
  }

  return (
    <>
      {items ? <Collapse items={items} defaultActiveKey={['1']} className='box-shadow' /> : null}
    </>
  )
}

export default Home
