import React from 'react';
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Icon,
} from '@material-ui/core';
import {
	makeStyles,
	Theme,
	ThemeProvider,
} from '@material-ui/core/styles';
import { InjectStoreModule, inject } from 'natur';
import clsx from 'classnames';
import { menuTheme } from '@/service/theme/material';
// icon
import SubList from '@biz/SubList';
import { Link, useLocation } from 'react-router-dom';
import sideBarBgImg from '@/assets/sidebar.jpg';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		position: 'relative',
		zIndex: 1,
	},
	paper: {
		backgroundColor: '#fff',
		backgroundImage: `url(${sideBarBgImg})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		'&:after': {
			backgroundColor: 'rgba(0,0,0, 0.6)',
			top: 0,
			width: '100%',
			height: '100%',
			content: '""',
			display: 'block',
			zIndex: 3,
			position: 'absolute',
		},
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(8),
	},
}));

const AppMenu: React.FC<{ app: InjectStoreModule }> = ({ app }) => {
	const classes = useStyles();
	const { isMenuOpen, menuData } = app.state;
	const [$open, setOpen] = React.useState(true);

	React.useEffect(() => {
		if (isMenuOpen === false) {
			setOpen(false);
		}
	}, [isMenuOpen, setOpen]);
	const open = React.useMemo(() => {
		if (isMenuOpen) {
			return isMenuOpen;
		}
		return $open;
	}, [isMenuOpen, $open]);
	const openMenu = React.useCallback(() => {
		if (!isMenuOpen) {
			setOpen(true);
		}
	}, [setOpen, isMenuOpen]);
	const closeMenu = React.useCallback(() => {
		if (!isMenuOpen) {
			setOpen(false);
		}
	}, [setOpen, isMenuOpen]);

	const { pathname } = useLocation();
	return (
		<ThemeProvider theme={menuTheme}>
			<Drawer
				onMouseEnter={openMenu}
				onMouseLeave={closeMenu}
				open={open}
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx(classes.paper, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<List style={{ padding: '0 10px', position: 'relative', zIndex: 4 }}>
					{menuData.map((item: any) => {
						if (!item.children) {
							return (
								<ListItem
									button
									selected={pathname === item.to}
									key={item.title + item.to}
									component={Link as any}
									to={item.to}
								>
									<ListItemIcon>
										<Icon>{item.icon}</Icon>
									</ListItemIcon>
									<ListItemText primary={item.title} />
								</ListItem>
							);
						}
						const isSubListSelected = item.children.some(
							({ to }: any) => pathname.includes(to),
						);
						return (
							<SubList
								title={item.title}
								key={item.title + String(item.to)}
								isMenuOpen={open}
								selected={isSubListSelected}
								icon={<Icon>{item.icon}</Icon>}
								open={isSubListSelected}
							>
								{item.children.map((subItem: any) => (
									<ListItem
										button
										selected={pathname === subItem.to}
										key={subItem.title + subItem.to}
										component={Link as any}
										to={subItem.to}
									>
										<ListItemIcon>
											<Icon>{subItem.icon}</Icon>
										</ListItemIcon>
										<ListItemText primary={subItem.title} />
									</ListItem>
								))}
							</SubList>
						);
					})}
				</List>
			</Drawer>
		</ThemeProvider>
	);
};

export default inject<{ app: InjectStoreModule }>([
	'app',
	{ state: ['isMenuOpen', 'menuData'] },
])(AppMenu);
