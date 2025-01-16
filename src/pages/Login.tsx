import { Button, Row } from "antd";
import { FieldValues, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { varifyToken } from "../utils/varifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHform from "../components/form/PHform";
import PHinput from "../components/form/PHinput";
import Password from "antd/es/input/Password";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: " ",
  //     password: "admin123",
  //   },
  // });
  // const { register } = useFormContext();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const toastId = toast.loading("Loggin in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = varifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("login success", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("something wants wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHform onSubmit={onSubmit}>
        <PHinput type="text" name="userId" label="Id" />
        <PHinput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </PHform>
    </Row>
  );
};

export default Login;
