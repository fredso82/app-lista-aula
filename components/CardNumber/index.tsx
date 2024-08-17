import { CardTitle, CardValue, Container } from './styles';

export interface CardNumberProps {
    title: string;
    value: number;
}

export function CardNumber(props: CardNumberProps){
    return(
        <Container>
            <CardTitle>{props.title}</CardTitle>
            <CardValue>{props.value}</CardValue>
        </Container>
    )
}