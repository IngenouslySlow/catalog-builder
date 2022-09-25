<script>
	const getJSON = () => {
		return fetch('http://localhost:8000/').then((res) => {
			return res.json();
		});
	};
</script>

<div class="font-montserrat flex flex-col items-center justify-center my-6">
	<img src="https://i.postimg.cc/63dCyhy3/logo.png" class="w-80" alt="Logo" />
	<div class="font-montserrat flex flex-col items-center justify-center mt-2">
		{#await getJSON()}
			<p>Waiting till we get the products back</p>
		{:then result}
			{#each result['set'] as set}
				<div
					class="my-3 rounded-t-[10px] rounded-r-[10px] flex items-start bg-[#1c3a57] p-3 w-auto mx-auto"
				>
					<h1 class="font-montserrat font-bold text-3xl text-white">
						{result['data'][set][0]['Brand']} <span class="font-light">/ {set}</span>
					</h1>
				</div>
				<div class="grid grid-cols-2 gap-2 cards">
					{#each result['data'][set] as category}
						<div class="radius-md rounded-md w-96 bg-white shadow-sm">
							<div class="flex justify-between my-4 mx-2">
								<img
									class="w-32 h-32 flex self-center"
									src={category['Image']}
									alt={category.Description}
								/>
								<div class="flex flex-col mx-2">
									<p class="font-semibold">{category['Description']}</p>
									<div class="flex justify-between my-1">
										<p class="text-gray-500">Packing</p>
										<p class="font-semibold">
											{category['Units Per Case']} x {category['Case Size']}
										</p>
									</div>
									<div class="flex justify-between my-1">
										<p class="text-gray-500">EAN</p>
										<p class="font-semibold">{category['Inner EAN']}</p>
									</div>
									<div class="flex justify-between my-1">
										<p class="text-gray-500">Layer Qty</p>
										<p class="font-semibold">{category['Layer Quantity']}</p>
									</div>
									<div class="flex justify-between my-1">
										<p class="text-gray-500">Pallet Qty</p>
										<p class="font-semibold">{category['Pallet Quantity']}</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/each}
		{/await}
	</div>
</div>

<style>
	.cards:last-of-type {
		margin-bottom: -2px;
	}
</style>
