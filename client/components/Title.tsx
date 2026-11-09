// scroll-mt: keeps the title visible below the fixed navbar when jumping to #id.
export default function Title({ id, title }: { id: string; title: string }) {
    return <h2 id={id} className="font-grotesk text-2xl text-extrabold font-semibold my-5 underline scroll-mt-20">
        {title}
        </h2>
}
