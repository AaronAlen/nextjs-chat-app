import "./user.css";

type UserData = {
  _id: string;
  name: string;
};

type Props = {
  data: UserData;
  onClick: () => void;
};

const User = ({ data, onClick }: Props) => {
  return (
    <div id="user" onClick={onClick}>
      {data.name}
    </div>
  );
};

export default User;