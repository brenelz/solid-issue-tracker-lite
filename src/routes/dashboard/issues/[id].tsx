import { useParams } from "@solidjs/router";

export default function Issues() {
    const params = useParams();
    return (
        <>
            <h2>Issue Detail</h2>
            {params.id}
        </>
    );
}
