import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  Image,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom'; 
import { sendLoginRequest } from '../../api/session';

export default function Login() {
  const navigate = useNavigate(); 

  // Hook `useForm` de Mantine para manejar el estado y validación del formulario
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'), 
      password: isNotEmpty('La contraseña no puede estar vacía'),
    },
  });

  // Función para manejar el envío del formulario
  async function handleSubmit(values: typeof form.values) {
    const { email, password } = values;

    try {
      const response = await sendLoginRequest({ email, password }); // enviar solicitud de login

      // Si la respuesta no es OK, manejar errores específicos según los códigos de estado
      if (!response.ok) {
        if (response.status === 404) { // 404 = Email no encontrado
          form.setErrors({
            email: 'Credenciales inválidas',
            password: 'Credenciales inválidas',
          });
          return;
        }
      }

      // Debug
      const responseBody = await response.json();
      console.log(response);
      console.log(responseBody);

      navigate('/'); // Redirigir al usuario a la página principal si el login es exitoso
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form method="post" onSubmit={form.onSubmit(handleSubmit)}>
      <Container size={480} my={40}>
        <Image src="/senacyt.svg" />
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="usuario@senacyt.gob.pa"
            key={form.key('email')} 
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="Tu contraseña"
            mt="md"
            key={form.key('password')} 
            {...form.getInputProps('password')} 
          />
          <Button type="submit" fullWidth mt="xl">Entrar</Button>
        </Paper>
      </Container>
    </form>
  );
}


