import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import goinupLogo from 'public/images/credits/goinup.png'
import teamValtellinaLogo from 'public/images/credits/team-valtellina.webp'

interface Props {
  promoter?: string;
}

export default function FooterLogo({ promoter }: Props) {

  if (promoter === 'goinup') {
    return (
      <>
        <Image src={goinupLogo} height={60} alt="Logo" />
      </>
    )
  }

  if (promoter === 'team-valtellina') {
    return (
      <>
        <Image src={teamValtellinaLogo} height={50} alt="Logo" />
      </>
    )
  }

  return (
    <></>
  )
}
