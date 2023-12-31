import cssButton from './Button.module.css';

const Button = (props) => {
    return (
        <button>{props.children}</button>
    );
}

export default Button;