import { BasicButton } from '@/Components/BasicButton';
import InputField from '@/Components/InputField'
import Layout from '@/Components/Layout';
import server from '@/Methods/Server';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const login = () => {
    const router = useRouter();
    const [login, setlogin] = useState({
        email: "",
        password: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setlogin((pre) => ({
            ...pre,
            [name]: value
        }))
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit", login);
        try {
            const response = await server.post("/api/userlogin", login);
            if (response.status === 200) {
                toast.success(response.data.message);
                router.push('/');

            } else {

                toast.success(`${response.data.message}`);
            }

        } catch (error) {
            toast.error(`${error}`);
            console.log(error);

        }
    }
    return (
        <Layout>
            <div className='flex justify-center  '>
                <div className="box_shadow p-2">
                    <h1 className=' font-bold  text-center'>Login</h1>
                    <form className="flex flex-col" onSubmit={handleSubmit} action="">
                        <InputField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="text"
                            required
                            name="email"
                            value={login.email}
                            onChange={handleInputChange}
                        />
                        <InputField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            required
                            name="password"
                            value={login.password}
                            onChange={handleInputChange}
                        />
                        <BasicButton
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Login
                        </BasicButton>
                        <Link className='text-center  underline text-blue-700' href='/register'>Register</Link>
                    </form>
                </div>
            </div>
        </Layout>

    )
}

export default login;