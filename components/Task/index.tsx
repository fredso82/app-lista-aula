import { Container, TaskDone, TaskText, TaskDelete, TaskComplete } from './styles';
import { Feather } from '@expo/vector-icons';

export interface TaskProps {
    description: string;
    check: boolean;
    onDelete: () => void;
    onComplete: () => void;
    onUndo: () => void;
}

export function Task(props: TaskProps) {
    let task;
    if (!props.check) {
        task = <TaskDone onPress={props.onComplete}>
                    <Feather name='square' size={24} color='white'></Feather>
                </TaskDone>
    } else {
        task = <TaskComplete onPress={props.onUndo}>
                    <Feather name='check-square' size={24} color='white'></Feather>
                </TaskComplete>
    }
    return (
        <Container>
            {task}
            <TaskText>{props.description}</TaskText>
            <TaskDelete onPress={props.onDelete}>
                <Feather name='trash' size={24} color='white'></Feather>
            </TaskDelete>
        </Container>
    );
}