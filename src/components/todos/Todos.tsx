import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import type { RadioChangeEvent } from "antd/es/radio";
import Table, { type ColumnType } from "antd/es/table";
import Radio from "antd/es/radio";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Checkbox from "antd/es/checkbox";
import Button from "antd/es/button";
import Result from "antd/es/result";
import { systemMessages } from "../../utils/utils";
import ListLoader from "../loaders/ListLoader";
import styles from './Todos.module.css';
import { useGetTodosQuery, useUpdateTodoByIdMutation } from "../../api/apiSlice";

type DataType = {
    key: React.Key;
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

const Todos = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [filter, setFilter] = useState(1);
    const [input, setInput] = useState('');
    const { data: todos, isLoading, isError, refetch } = useGetTodosQuery(null);
    const [updateTodoById] = useUpdateTodoByIdMutation();

    const columns: ColumnType<DataType>[] = [
        {
            title: 'UserID',
            dataIndex: 'userId',
            sortDirections: ['ascend', 'descend'],
            sorter: (a: DataType, b: DataType) => a.userId - b.userId,
            width: '20%',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sortDirections: ['ascend', 'descend'],
            sorter: (a: DataType, b: DataType) => {
                const nameA = a.title.toLocaleLowerCase();
                const nameB = b.title.toLocaleLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            },
            onFilter: (value: string, record: { title: string }) => record.title.startsWith(value as string),
            width: '60%',
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            sortDirections: ['ascend', 'descend'],
            sorter: (a: DataType, b: DataType) => {
                const nameA = a.completed;
                const nameB = b.completed;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            },
            filters: [
                {
                    text: 'Completed',
                    value: true,
                },
                {
                    text: 'Not completed',
                    value: false,
                },
            ],
            onFilter: (value: boolean, record: DataType) => record.completed === value,
            filterSearch: true,
            width: '20%',
            render: (value: boolean, record: DataType) =>
                <Checkbox checked={value} onClick={async () => {
                    await updateTodoById({ id: record.id, todo: { completed: !record.completed } });
                }} />

        },
    ];

    const mapItemsToColData = useCallback((): DataType[] => {
        return (todos || []).map(item => {
            return {
                key: item.id,
                id: item.id,
                userId: item.userId,
                title: item.title,
                completed: item.completed
            }
        })
    }, [todos])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleFilterChange = (e: RadioChangeEvent) => {
        setFilter(e.target.value);
    }

    const handleSearch = () => {
        if (!input) return;
        switch (filter) {
            case 1: {
                setDataSource(() => mapItemsToColData().filter(item => String(item.userId) === input))
                return;
            }
            case 2: {
                setDataSource(() => mapItemsToColData().filter(item => item.title.includes(input)))
                return;
            }
        }
    }

    const handleReset = () => {
        setInput('');
        setDataSource(mapItemsToColData());
    }

    useEffect(() => {
        const data = mapItemsToColData();
        setDataSource(data);
    }, [todos, mapItemsToColData])

    if (isLoading) {
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

    return (<>
        <Space style={{ marginBottom: '2rem' }}>
            <Input maxLength={100} value={input} placeholder="Filter by" className={styles.todosSearchField} onChange={handleInputChange} onPressEnter={handleSearch} />
            <Radio.Group
                value={filter}
                onChange={handleFilterChange}
                options={[
                    { value: 1, label: 'userId' },
                    { value: 2, label: 'title' },
                ]}
            />
            <Button onClick={handleSearch} data-testid="todos-search-button">Search</Button>
            <Button onClick={handleReset} data-testid="todos-reset-button">Reset</Button>
        </Space>
        <Table columns={columns} dataSource={dataSource} />
    </>)
}

export default Todos;