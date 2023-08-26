import Spinner from 'react-bootstrap/Spinner';
const Loading = () => {
    return <div>
        <Spinner
            as="span"
            animation="grow"
            size="lg"
            role="status"
            aria-hidden="true"
        />  Loading....
    </div>
}

export default Loading;