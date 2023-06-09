import { Input } from "@material-tailwind/react";

export const PayoutSettingsComponent: IComponent = () => {
  return (
    <div className="py-8">
      <div className=" dark:text-white heading flex flex-col gap-2 mx-4 !font-serif ">
        <h1 className="text-2xl font-normal ">Payout Settings</h1>
        <p className="text-sm italic dark:text-darkText">
          Where should any funds generated by this contract flow to.
        </p>
        <div className="sales">
          <h2 className="text-xl font-normal">Primary Sales</h2>
          <p className="text-sm italic dark:text-darkText">
            Determine the address that should receive the revenue from initial
            sales of the assets.
          </p>
          <h3 className="text-lg font-normal mb-2">Recipient Address</h3>
          <Input
            size="lg"
            label="Address"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            required
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-normal">Royalties</h2>
          <p className="text-sm italic dark:text-darkText">
            Determine the address that should receive the revenue from royalties
            earned from secondary sales of the assets.
          </p>
          <form className="mt-4 grid grid-cols-4 gap-8">
            <div className="col-span-3">
              <h3 className="text-lg font-normal mb-2">Recipient Address</h3>
              <Input
                size="lg"
                label="Address"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                required
              />{" "}
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-normal mb-2">Percentage</h3>
              <Input
                size="lg"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                defaultValue={0.0}
                label={undefined}
                className="relative overflow-hidden"
                icon={
                  <span className="absolute -top-2 -right-3 h-fit bg-[#E5E5EA] dark:bg-gray-900 py-2 px-4 rounded-r-lg">
                    %
                  </span>
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
