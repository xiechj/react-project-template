
import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import IconButton from '@base/IconButton';
import Button from '@base/Button';
import Menu from '@material-ui/icons/Menu';
import { InjectStoreModule, inject } from 'natur';

const Bar:React.FC<{app: InjectStoreModule}> = ({app}) => (
	<AppBar position="static" elevation={0}>
		<Toolbar>
			<IconButton onClick={app.actions.toggleMenu} edge="start" color="inherit" aria-label="menu">
				<Menu />
			</IconButton>
			<Typography variant="h6">News</Typography>
			<Button color="inherit">Login</Button>
		</Toolbar>
	</AppBar>
);

export default inject<{app: InjectStoreModule}>('app')(Bar);
