import { Link, useParams } from "react-router";
import Empty from "antd/es/empty";
import Breadcrumb from "antd/es/breadcrumb";
import Result from "antd/es/result";
import Button from "antd/es/button";
import Alert from "antd/es/alert";
import { useDelayedLoader } from "../../hooks/useDelayedLoader";
import UserProfile from "../users/UserProfile";
import PostsForm from "./PostsForm";
import { systemMessages } from "../../utils/utils";
import ListLoader from "../loaders/ListLoader";
import styles from './PostsForm.module.css';
import { useDeletePostByIdMutation, useGetPostsByUserIdQuery, useGetUserByIdQuery } from "../../api/apiSlice";

const Posts = () => {
    const { userId } = useParams();
    const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(userId);
    const { data: posts, isLoading, isError, refetch } = useGetPostsByUserIdQuery(userId);
    const [deletePostById] = useDeletePostByIdMutation();
    const showLoader = useDelayedLoader(isLoading, 500);

    const handleDelete = async (id: number) => {
        await deletePostById(id);
    }

    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link to="/">Home</Link>,
                    },
                    {
                        title: 'User',
                    },
                    {
                        title: 'Posts',
                    },
                ]}
                style={{ paddingInline: '24px' }}
            />

            {isUserLoading ? <ListLoader customStyles={{ maxWidth: "600px" }} /> : null}

            {user ? <UserProfile user={user} /> : !isUserLoading ? <Empty /> : null}

            <h2 className={styles.postTitle}>Posts</h2>

            {isError ? <Alert message={systemMessages.GENERAL_ERROR} type="error" style={{ margin: '0 auto', maxWidth: '600px' }} /> : null}

            {showLoader ? <ListLoader length={3} customStyles={{ maxWidth: "600px" }} /> : null}

            {isError ? <Result
                status="warning"
                title={systemMessages.GENERAL_ERROR}
                extra={
                    <Button type="primary" key="console" onClick={refetch}>
                        Retry
                    </Button>
                }
            /> : null}

            {posts && posts.length ? posts.map(post =>
                <PostsForm key={post.id} initialData={post} handleDelete={handleDelete} />)
                : (!isError && !isLoading) ? <Empty /> : null}
        </>
    )
}

export default Posts;