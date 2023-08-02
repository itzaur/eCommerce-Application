import { useState } from 'react';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import { Stack } from '@mui/system';

export const Login = () => {
	const [
		isSubmitting,
		setIsSubmitting,
	] = useState(false);
	const [
		isAuthorized,
		setIsAuthorized,
	] = useState(false);

	const handleSubmit = () => {
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setIsAuthorized(true);
		}, 1500);
	};

	return (
		<Grid
			container
			spacing={2}
			sx={{ flexGrow: 1 }}
		>
			<Stack
				spacing={{ xs: 1, sm: 2 }}
				direction="column"
			>
				<Stack
					spacing={{ xs: 1, sm: 2 }}
					direction="row"
					useFlexGap
					flexWrap="wrap"
				>
					<Input
						placeholder="Login"
						color="primary"
					/>
					<Input
						placeholder="Password"
						color="primary"
					/>
				</Stack>
				<Stack
					spacing={{ xs: 1, sm: 2 }}
					direction="row"
					useFlexGap
					flexWrap="wrap"
				>
					<Button
						onClick={handleSubmit}
						color="primary"
						loading={isSubmitting}
					>
						{isAuthorized
							? 'Авторизовано!'
							: 'Войти!'}
					</Button>
				</Stack>
			</Stack>
		</Grid>
	);
};
