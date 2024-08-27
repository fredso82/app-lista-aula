import { CardTitle, CardValue, Container } from './styles';

export interface CardNumberProps {
    title: string;
    value: number;
    color: string;
}

export function CardNumber(props: CardNumberProps){
    return(
        <Container>
            <CardTitle>{props.title}</CardTitle>
            <CardValue style={props.color ? {color: props.color} : {}}>{props.value}</CardValue>
        </Container>
    )
}