interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size: string;
  fill?: string;
  stroke?: string;
}

interface OAuthTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  token_type: string;
}
