import { cn } from '~/lib/utils';
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
        <div class={cn(styles.avatar, { [styles.avatar_online]: props.online })} data-tooltip={props.name}>
            <img
                alt={props.name}
                src={props.src || 'https://www.gravatar.com/avatar/?d=mp'}
                height={IMAGE_SIZE}
                width={IMAGE_SIZE}
                class={cn(styles.avatar_picture)}
                onClick={props.onClick}
            />
        </div>
    );
}