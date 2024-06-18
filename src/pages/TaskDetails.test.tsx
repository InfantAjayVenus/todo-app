import {it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import TaskDetails from './TaskDetails';
import { Task } from '../types/TaskTypes';

it('renders TaskDetails component', () => {
    //Assemble
    const taskData: Task = {
        id: 'random_id',
        title: 'Test Task',
        isComplete: false,
        isFavourite: true,
        projectId: 'test_project_id',
    }

    const onCloseMock = vi.fn();
    const onEditMock = vi.fn();
    const onDeleteMock = vi.fn();

    //Act
    render(<TaskDetails activeTask={taskData} onClose={onCloseMock} onEdit={onEditMock} onDelete={onDeleteMock} isDetailsViewActive/>);

    //Assert
    screen.debug();
})