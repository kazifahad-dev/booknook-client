import PrivateRoute from "@/components/PrivateRoute";
import ProfileCard from "@/components/ProfileCard";

export const metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">My Profile</h2>
          <p className="mt-2 opacity-80">Your BookNook account</p>
        </div>
        <ProfileCard />
      </section>
    </PrivateRoute>
  );
}