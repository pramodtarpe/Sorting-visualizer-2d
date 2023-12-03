import cssCard from './Card.module.css';

const Card = (props) => {
    return (
        <div className={`${cssCard.card} ${props.className}`}>{props.children}</div>
    );

}

export default Card;