import styles from './Avatar.module.css';

const IMAGE_SIZE = 28;

type AvatarProps = {
    name: string;
    src: string | null;
    onClick?: () => void;
    online?: boolean;
}

export default function Avatar(props: AvatarProps) {
    return (
        <div class={styles.avatar} data-tooltip={props.name}>
            <img
                alt={props.name}
                src={props.src || 'https://www.gravatar.com/avatar/?d=mp'}
                height={IMAGE_SIZE}
                width={IMAGE_SIZE}
                class={styles.avatar_picture}
                onClick={props.onClick}
                classList={{ "online": props.online }}
            />
        </div>
    );
}