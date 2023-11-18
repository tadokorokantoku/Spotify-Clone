interface OtherUserProps {
  prop: string;
}

// export async function generateStaticParams() {
//   const users = await fetch('https://.../user').then(res => res.json());

//   return users.map((user: { pid: string }) => ({
//     userIds: user.pid,
//   }));
// }

export default function OtherUser({ params }: { params: { pid: string } }) {
  return <div>{params.pid}</div>;
}
