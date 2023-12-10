import cssBanner from './Banner.module.css';

const Banner = (props) => {
    const HeaderType = props.type;

    return (
        <HeaderType className={cssBanner.banner}>
            {props.children}
        </HeaderType>
    )

}

export default Banner;