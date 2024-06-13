import { motion } from "framer-motion";
import { Thread } from "../../types/Threads";
import styled from "@emotion/styled";
import { Badge } from "../atoms/Badge";
import {
  ClockIcon,
  DesktopIcon,
  GlobeIcon,
  MobileIcon,
} from "@radix-ui/react-icons";

const List = styled(motion.section)`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const DeviceTypeIcon = ({ type }: Thread["tracking"]["device"]["type"]) => {
  if (type === "mobile") return <MobileIcon />;
  if (type === "console")
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 256 256"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M176,108H152a4,4,0,0,1,0-8h24a4,4,0,0,1,0,8Zm-72-8H92V88a4,4,0,0,0-8,0v12H72a4,4,0,0,0,0,8H84v12a4,4,0,0,0,8,0V108h12a4,4,0,0,0,0-8Zm134.21,98.36a32,32,0,0,1-48.84,4.27l-.17-.18L148.29,156H107.72L66.81,202.44l-.18.19A32.08,32.08,0,0,1,44,212a32,32,0,0,1-31.5-37.56L28.87,90.21A55.87,55.87,0,0,1,83.89,44H172a56.07,56.07,0,0,1,55.1,46.1.29.29,0,0,1,0,.1l16.37,84.16A31.86,31.86,0,0,1,238.21,198.36ZM172,148a48,48,0,1,0,0-96H83.9A47.9,47.9,0,0,0,36.74,91.67L20.36,175.9a24,24,0,0,0,19.48,27.73,24,24,0,0,0,21-6.58l42-47.69a4,4,0,0,1,3-1.36Zm63.63,27.83-11-56.66A56.09,56.09,0,0,1,172,156H159l36.16,41.06a24,24,0,0,0,40.52-21.23Z"></path>
      </svg>
    );
  return <DesktopIcon />;
};

export default function DeviceInfoTags({
  browser,
  cpu,
  language,
  os,
  screen,
  type,
  tz,
  network,
}: Thread["tracking"]["device"]) {
  return (
    <List>
      <Badge>
        <DeviceTypeIcon {...type} />
        {screen.width}w x {screen.height}h
      </Badge>
      {browser.version && browser.name ? (
        <Badge>
          <GlobeIcon /> {browser.name} {browser.version}
        </Badge>
      ) : null}
      {os.name ? (
        <Badge>
          <strong>OS</strong> {os.name}
        </Badge>
      ) : null}
      {type.vendor && type.model ? (
        <Badge>
          <DeviceTypeIcon {...type} /> {type.vendor} {type.model}
        </Badge>
      ) : null}
      <Badge>
        <ClockIcon /> {tz}
      </Badge>
      {network?.effectiveType ? (
        <Badge>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 256 256"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M144,204a16,16,0,1,1-16-16A16,16,0,0,1,144,204ZM239.61,83.91a176,176,0,0,0-223.22,0,12,12,0,1,0,15.23,18.55,152,152,0,0,1,192.76,0,12,12,0,1,0,15.23-18.55Zm-32.16,35.73a128,128,0,0,0-158.9,0,12,12,0,0,0,14.9,18.81,104,104,0,0,1,129.1,0,12,12,0,0,0,14.9-18.81ZM175.07,155.3a80.05,80.05,0,0,0-94.14,0,12,12,0,0,0,14.14,19.4,56,56,0,0,1,65.86,0,12,12,0,1,0,14.14-19.4Z"></path>
          </svg>
          {network.effectiveType}
        </Badge>
      ) : null}
    </List>
  );
}
