import {
  AiFillPrinter,
  AiOutlineUserSwitch,
  AiFillSetting,
} from "react-icons/ai";
import { FaUsers, FaFileDownload } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsPrinter } from "react-icons/bs";

export const data = [
  {
    menu: "Card Request",
    icon: <BsPrinter size={20} />,
    menuPermission: [
      "can_delete_entrypass",
      "can_update_entrypass",
      "can_read_entrypass",
      "can_create_entrypass",
      "can_verify_entrypass",
      "can_approve_entrypass",
      "can_reject_entrypass",
    ],
    subMenu: [
      {
        name: "Pass Request",
        link: "/entry-pass-request",
        permission: [
          "can_delete_entrypass",
          "can_update_entrypass",
          "can_read_entrypass",
          "can_create_entrypass",
        ],
      },
      {
        name: "Verified Pass",
        link: "/entry-pass-verify",
        permission: ["can_verify_entrypass"],
      },
      {
        name: "Approved Pass",
        link: "/entry-pass-approve",
        permission: ["can_approve_entrypass"],
      },
      {
        name: "Rejected Card",
        link: "/rejected-card",
        permission: ["can_reject_entrypass"],
      },
      {
        name: "Printed Card",
        link: "/entry-pass-printed",
        permission: ["can_print_cardprinting"],
      },
    ],
  },
  {
    menu: "Office",
    icon: <HiOutlineOfficeBuilding size={20} />,
    menuPermission: ["can_read_office", "can_delete_office"],
    subMenu: [
      {
        name: "Office",
        link: "/office",
        permission: ["can_read_office", "can_delete_office"],
      },
    ],
  },
  {
    menu: "User Setup",
    icon: <AiOutlineUserSwitch size={20} />,
    menuPermission: [
      "can_delete_user",
      "can_read_user",
      "can_update_user",
      "can_create_user",
      "can_delete_role",
      "can_read_role",
      "can_update_role",
      "can_create_role",
    ],
    subMenu: [
      {
        name: "User Setup",
        link: "/user",
        permission: [
          "can_delete_user",
          "can_read_user",
          "can_update_user",
          "can_create_user",
        ],
      },
      {
        name: "Role",
        link: "/role",
        permission: [""],
      },
    ],
  },

  {
    menu: "Card Reprint",
    icon: <MdRefresh size={20} />,
    menuPermission: ["can_read_entrypass", "can_print_cardprinting"],
    subMenu: [
      {
        name: "Card Reprint",
        link: "/reprint",
        permission: ["can_read_entrypass"],
      },
      {
        name: "Approved Card Reprint",
        link: "/approved-reprint",
        permission: ["can_read_entrypass"],
      },
      {
        name: "Card Reprint Printed",
        link: "/reprint-printed",
        permission: ["can_print_cardprinting"],
      },
    ],
  },
  {
    menu: "Reports",
    icon: <TbReportAnalytics size={22} />,
    menuPermission: ["can_read_reports"],
    subMenu: [
      {
        name: "New Card Report",
        link: "/new-card-report",
        permission: ["can_read_reports"],
      },
      {
        name: "Reprint Card Report",
        link: "/reprint-card-report",
        permission: ["can_read_reports"],
      },
    ],
  },
];
