import { CLINIC_AUDIT_STRIPE_URL } from "../../constants";
import CtaButton from "../CtaButton";

export default function ClinicCtaButton(props) {
  return <CtaButton href={CLINIC_AUDIT_STRIPE_URL} {...props} />;
}
