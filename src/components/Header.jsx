import quiz_logo from '../assets/quiz-logo.png'
import { Image } from 'primereact/image';

export default function Header () {
    return (
        <header>
            <Image src={quiz_logo} alt="Quiz-Logo" preview />
            <h1>Welcome to React Quiz</h1>
        </header>
    );
}