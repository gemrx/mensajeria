import { useState } from 'react';
import { Group, Burger } from '@mantine/core'; // Import Burger here
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Navbar.module.css';

const data = [
  { link: '', label: 'Nueva Correspondencia', icon: IconBellRinging },
  { link: '', label: 'Nuevo Remitente', icon: IconReceipt2 },
  { link: '', label: 'Correspondencias Asignadas', icon: IconFingerprint },
  { link: '', label: 'Todas Las Correspondencias', icon: IconKey },
];

interface NavbarProps {
  mobileOpened: boolean;
  toggleMobile: () => void;
}

export default function Navbar({ mobileOpened, toggleMobile }: NavbarProps) { // Accept props here
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} inverted style={{ color: 'white' }} />
          {/* Move the Burger component here */}
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
