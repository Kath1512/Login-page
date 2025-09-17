import styled from "styled-components";

export default function ErrorPage(){
    return(
        <Container>
            <div className="error">
                <h1>404 Not Found</h1>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100vh;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .error{
        background-color: hsla(0, 0%, 80%, 60%);
        backdrop-filter: blur(5px);
        box-shadow: 0 0 5px 5px hsla(0, 0%, 80%, 50%);
        width: 30%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover{
            background-color: hsla(0, 0%, 85%, 70%);
        }
        h1{
            margin: 0;
            padding: 0;
        }
    }
`
