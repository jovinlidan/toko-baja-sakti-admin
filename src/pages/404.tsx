import LinkText from "@/components/elements/link-text";
import { css } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Oops! You&apos;ve wandered off the path!</h1>

      <Image
        src="/cartoon-image.png"
        alt="Cartoon Image"
        width={200}
        height={200}
      />

      <p>
        It seems you&apos;ve stumbled upon our mischievous 404 page. Don&apos;t
        worry; we&apos;re here to solve the mystery together. Who&apos;s to
        blame? Let&apos;s find out!
      </p>

      <p>
        Could it be the curious engineer who tinkered a little too much? Or
        perhaps the mischievous gremlins who love to play hide-and-seek with our
        web pages? We&apos;re still investigating, but rest assured, we&apos;ll
        get to the bottom of it!
      </p>

      <p>In the meantime, here are some options to get you back on track:</p>

      <ul className={styles.optionList()}>
        <li>
          <Link href="#">Double-check the URL</Link>
        </li>
        <li>
          <Link href={routeConstant.ItemList}>Return to homepage</Link>
        </li>
        <li>
          <Link href="#">Explore our site</Link>
        </li>
      </ul>

      <p>
        If you&apos;re feeling adventurous, you can always try solving the
        mystery with us! Leave us a message and tell us your theory about
        who&apos;s behind this 404 mishap. We appreciate your detective skills!
      </p>

      <form
        className={styles.messageForm()}
        action="#"
        onSubmit={(e) => e.preventDefault()}
      >
        <textarea placeholder="Your theory..."></textarea>
        <br />
        <input type="submit" value="Send Message" />
      </form>

      <p>
        Thank you for your patience and understanding. We&apos;ll make sure to
        hold the right party accountable, once we figure out who it is!
      </p>

      <p>
        Best regards,
        <br />
        Toko Baja Sakti
      </p>
    </div>
  );
}

const styles = {
  img: css({
    mb: 20,
  }),
  optionList: css({
    listStyleType: "none",
    padding: 0,
    mb: 30,
    "& li": {
      display: "inline-block",
      mr: 10,
    },
    "& li a": {
      display: "inline-block",
      padding: "10px 15px",
      backgroundColor: "#333",
      color: "#FFF",
      textDecoration: "none",
      borderRadius: 5,
      transition: "background-color 0.3s ease",
    },
    "& li a:hover": {
      backgroundColor: "#555",
    },
  }),
  messageForm: css({
    mt: 30,
    "& textarea": {
      width: 300,
      height: 100,
      padding: 10,
      resize: "none",
    },
    "& input[type='submit']": {
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "#FFF",
      border: "none",
      borderRadius: 5,
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    "& input[type='submit']:hover": {
      backgroundColor: "#555",
    },
  }),
};
