import { BasicButton } from '@/Components/BasicButton';
import InputField from '@/Components/InputField'
import Layout from '@/Components/Layout';
import server from '@/Methods/Server';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const register = () => {
    const router = useRouter();
    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegister((pre) => (
            {
                ...pre,
                [name]: value
            }
        ))
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit is click", register);
        try {
            const response = await server.post("/api/user", register);
            if (response.status === 200) {
                toast.success(response.data.message);
                router.push("/login");
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
            <div className='flex justify-center '>
                <div className='box_shadow p-5'>
                    <h1>Register Form</h1>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <InputField
                            id="name"
                            required
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={register.name}
                            onChange={handleInputChange}
                        />
                        <InputField
                            id="email"
                            label="Email"
                            required
                            variant="outlined"
                            name="email"
                            type="email"
                            value={register.email}
                            onChange={handleInputChange}
                        />
                        <InputField
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            name="phone"
                            required
                            value={register.phone}
                            onChange={handleInputChange}
                        />
                        <InputField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            required
                            name="password"
                            value={register.password}
                            onChange={handleInputChange}
                        />
                        <BasicButton
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </BasicButton>
                        <Link className=' underline text-blue-700 text-center' href="/login">Login In</Link>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default register